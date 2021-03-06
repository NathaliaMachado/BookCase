import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom';
import PubSub from 'pubsub-js';
import TratadorErros from  './TratadorErros';

class FormularioAutor extends Component {

  constructor() {
    super();    
    this.state = {nome:'',email:'',senha:''};
    this.enviaForm = this.enviaForm.bind(this);
  
  }

  enviaForm(evento){
    evento.preventDefault();    
    $.ajax({
      url:'http://localhost:8080/api/autores',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success: function(novaListagem){
        PubSub.publish('atualiza-lista-autores',novaListagem);        
        this.setState({nome:'',email:'',senha:''});
      }.bind(this),
      error: function(resposta){
        if(resposta.status === 400) {
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      }      
    });
  }

  saveChanges(nameInput, evento){
    var field = {};
    field[nameInput] = evento.target.value;
    this.setState(field);
  }

  

    render() {
        return (
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <InputCustom id="nome" type="text" name="nome" value={this.state.nome} onChange={this.saveChanges.bind(this, 'nome')} label="Name"/>                                              
                <InputCustom id="email" type="email" name="email" value={this.state.email} onChange={this.saveChanges.bind(this, 'email')} label="Email"/>                                              
                <InputCustom id="senha" type="password" name="senha" value={this.state.senha} onChange={this.saveChanges.bind(this, 'senha')} label="Password"/>                                                                      
                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="pure-button pure-button-primary">Submit</button>                                    
                </div>
              </form>             

            </div>  

        );
    }
}

class TabelaAutores extends Component {

    render() {
        return(
                <div>            
                   <table className="pure-table">
                     <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                       </tr>
                     </thead>
                     <tbody>
                      {
                        this.props.lista.map(function(autor){
                           return (
                              <tr key={autor.id}>
                                <td>{autor.nome}</td>
                                <td>{autor.email}</td>
                              </tr>
                            );
                        })
                      }
                     </tbody>
                    </table> 
                </div>                     
        );
    }
}

export default class AutorBox extends Component {

  constructor() {
    super();    
    this.state = {lista : []};    
  }

  componentDidMount(){  
    $.ajax({
        url:"http://localhost:8080/api/autores",
        dataType: 'json',
        success:function(resposta){    
          this.setState({lista:resposta});
        }.bind(this)
      } 
    );          

    PubSub.subscribe('atualiza-lista-autores',function(topico,novaLista){
      this.setState({lista:novaLista});
    }.bind(this));
  }   


  render(){
    return (
      <div>
        <div className="header">
          <h1> Autor's Registration</h1>
        </div>
        <div className="content" id="content">
          <FormularioAutor/>
          <TabelaAutores lista={this.state.lista}/>
        </div>
      </div>
    );
  }
}