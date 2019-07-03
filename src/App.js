import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
      super();
      this.state = {lista : []};
  }

  componentDidMount() {

    $.ajax({
        url:"http://localhost:8080/api/autores",
        dataType: 'json',
        success: function(resposta) {
            this.setState({lista:resposta});
        }.bind(this)
    }
    );
  }

  enviaForm(evento) {
    evento.preventDefault();
    
    $.ajax({
        url:'http://8080localhost/api/autores',
        contentType:'application/json',
        dataType:'json',
        type:'post',
        data: JSON.stringify({nome:'', email:'', senha:''}),
        success: function(resposta) {
          console.log("enviado com sucesso");
        },
        error: function(resposta) {
          console.log("erro");
        }
    });
  }

  render() {

     return (

        <div id="layout">
           <a href="#menu" id="menuLink" className="menu-link">
             <span></span>
           </a>

           <div id="menu">
             <div className="pure-menu">
               <a className="pure-menu-heading" href="#">Company</a>

              <ul className="pure-menu-lista">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Author</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Book</a></li>
              </ul>
            </div>
        </div>

        <div id="main">
          <div className="header">
              <h1>Author's register</h1>
              </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                  <div className="pure-control-group">
                    <label htmlFor="nome">Name</label> 
                    <input id="nome" type="text" name="name" value="" />                  
                  </div>
                  <div className="pure-control-group">
                    <label htmlFor="email">Email</label> 
                    <input id="email" type="email" name="email" value="" />                  
                  </div>
                  <div className="pure-control-group">
                    <label htmlFor="senha">Password</label> 
                    <input id="senha" type="password" name="senha"  />                                      
                  </div>
                  <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Submit</button>                                    
                  </div>
                </form>             

              </div>  
              <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.lista.map(function(autor) {
                        return  (
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
            </div>
          </div>  
  </div>
        
    );
  }
}

export default App;
