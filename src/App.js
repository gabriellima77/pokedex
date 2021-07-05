import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { Component } from 'react';
import Footer from './components/Footer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoading: true,
      pokemon: '',
      filteredList: [],
    }
  }

  setData = (pokemons)=> {
    this.setState({
      list: [...pokemons],
      isLoading: !this.state.isLoading,
      filteredList: [...pokemons]
    });
  }

  filterHandler = (str)=> {
    if(str){
      this.setState((prev)=> ({
        filteredList: prev.list.filter((pokemon)=> (pokemon.name.includes(str)))
      }));
    } else {
      this.setState({
        filteredList: [...this.state.list],
      });
    }
  }

  typeFilterHandler = (type)=> {
    if(type){
      this.setState((prev)=> ({
        filteredList: prev.list.filter((pokemon)=> {
          const hasType = pokemon.types.find((compare)=>(compare.type.name === type));
          if(hasType) return pokemon;
        })
      }));
    } else {
      this.setState({
        filteredList: [...this.state.list],
      });
    }
  }

  setPokemon = (promise)=> {
    this.setState({
      pokemon: promise,
    });
  }

  returnHandler = ()=> {
    this.setState({
      pokemon: '',
    });
  }

  render() {
    const { isLoading, pokemon, filteredList } = this.state; 
    return (
      <div className="App">
        <Header
          filterHandler={this.filterHandler}
          typeFilterHandler={this.typeFilterHandler}
        />
        <Main
          list={filteredList}
          isLoading={isLoading}
          pokemon={pokemon}
          filteredList={filteredList}
          setData={this.setData}
          setPokemon={this.setPokemon}
          returnHandler={this.returnHandler}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
