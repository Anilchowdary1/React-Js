import React from 'react';
import './index.css';
import {
    withRouter,
  }
  from "react-router-dom";
class CountryCard extends React.Component{
    
    viewCountryDetails=(country)=>{
        this.props.viewCountryDetails(this.props.country);
    }

    render(){
        const url = this.props.flag;
        const flagStyle={
            backgroundImage: 'url('+url+')',
            backgroundSize: 'cover',
            height: '200px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
        return(
             <div onClick={this.viewCountryDetails} className=" country-card rounded relative  shadow  ">
                <div style ={flagStyle} className="rounded-top  w-100 bg-cover bg-center">
                    </div>
                <div className="p-3">
                <strong className="text-lg">{this.props.name}</strong>
                <p className="mb-2 mt-3">
                    <b>Population:</b> {this.props.population}</p>
                 <p className="mb-2">
                    <b>Region:</b> {this.props.region}</p>
                <p className="">
                    <b>Capital:</b> {this.props.capital}</p>
            </div>
         </div>
         );
    }
}
class CountryList extends React.Component{
   constructor(props){
       super(props);
       this.countriesToRender = [];
       this.state = {countryList:[],region:'All',theme:'light'};
   }

   changeRegion = (event) =>{
       const selectedRegion = event.target.value;
        this.setState({region:selectedRegion});
   }

   renderCountries = (selectedRegion) =>{
       const renderedCountries = this.state.countryList.filter((country)=>{
            return (country.region === selectedRegion);
       });
       return renderedCountries;
   }

   countriesToBeRendered = () =>{
    if(this.state.region === 'All'){
        this.countriesToRender= this.state.countryList;
    }else if(this.state.region === 'Asia'){
        this.countriesToRender = this.renderCountries('Asia');
    }else if(this.state.region === 'Africa'){
        this.countriesToRender = this.renderCountries('Africa');
    }else if(this.state.region === 'Americas'){
        this.countriesToRender = this.renderCountries('Americas');
    }else if(this.state.region === 'Europe'){
        this.countriesToRender = this.renderCountries('Europe');
    }else {
        this.countriesToRender = this.renderCountries('Oceania');
    }
   }
   componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then((data) => {
      this.setState({ countryList: data })
    })
    .catch(console.log)
  }

    searchCountries = (event) =>{
        console.log(event.keyCode);
        if(event.keyCode === 13){
        const keyword = event.target.value.toUpperCase();
        this.setState({region:'search'});
        this.countriesToRender = this.state.countryList.filter((country)=>{
            return(country.name.toUpperCase().includes(keyword));
        });
        }
    }
    changeTheme = () =>{
        this.setState((state=>({theme:state.theme === 'light'?'dark':'light'})));
    }
    viewCountryDetails = (country) => {
        this.props.history.push({
            pathname: `/countrylist/details/${country.alpha3Code}`,
            state: {
                countryDetails: JSON.stringify(country),
            }
        });
    };
    render(){
        if(this.state.region !== 'search'){
         this.countriesToBeRendered();
        }
        const currentTheme = this.state.theme;
        return(
            <div className={this.state.theme==='light'?"bg-light text-white":"bg-dark text-dark"}>
                <header className="d-flex justify-content-between position-relative px-lg-10 px-xl-16 py-8 px-5 shadow p-4 mb-5  rounded align-items-center ">
                    <a aria-current="page" className={this.state.theme==='light'?"title-heading px-3  text-xl-left text-dark":"title-heading px-3  text-xl-left text-light"} href="/countrylist">Where in the world?</a>
                <div className="d-flex text-capitalize px-3 align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 16 16"><path fill={currentTheme==='light'?"#000":"#fff"} d="M13.2 11.9c-4.5 0-8.1-3.6-8.1-8.1 0-1.4.3-2.7.9-3.8-3.4.9-6 4.1-6 7.9C0 12.4 3.6 16 8.1 16c3.1 0 5.8-1.8 7.2-4.4-.6.2-1.3.3-2.1.3zM8.1 15C4.2 15 1 11.8 1 7.9c0-2.5 1.3-4.7 3.3-6-.2.6-.2 1.2-.2 1.9 0 5 4.1 9.1 9.1 9.2-1.4 1.2-3.2 2-5.1 2z"></path></svg>
                    <p onClick={this.changeTheme} className={currentTheme==='light'?"text-dark bg-light m-1 text-capitalize text-center toggle-theme":"toggle-theme text-light bg-dark text-capitalize text-center m-1 "}>{currentTheme==='light'? 'light mode':'dark mode'}</p>
                </div>
                </header>
                <main className=" px-5 text-light px-lg-8 px-xl-16  w-100">
                    <div className="d-flex px-2 justify-content-between align-items-center mb-3">
                        <div  className={currentTheme==='light'?"d-flex px-3 flex-wrap rounded shadow bg-white w-20 w-md-auto align-items-center":"d-flex px-3 text-grey flex-wrap rounded shadow night-mode-elements w-20 w-md-auto align-items-center"}>
                        <img className="search w-10" src="https://res.cloudinary.com/dqcsk8rsc/image/upload/v1578427182/Search_1_1_1_dms40o.svg" alt=""></img>{/*eslint-disable-next-line*/}
                            <input onKeyDown={this.searchCountries} className={currentTheme==='light'?"text-grey w-90  rounded  py-3 px-10 border-0  mb-10 mb-md-0":"text-white w-90  rounded  py-3 px-10 border-0  mb-10 mb-md-0 night-mode-elements"} type="text" id="country" placeholder="Search for a country..." ></input>
                        </div>
                        <select onChange={this.changeRegion} name="region" id="" className={currentTheme==='light'?"m-2 bg-white border-0 px-3 py-2 shadow p-3  rounded w-8/12 w-md-auto":"m-2 text-white border-0 px-3 py-2 night-mode-elements shadow p-3 rounded w-8/12 w-md-auto"}>
                            <option value="All">All</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">Americas</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                    <div className={this.state.theme==='light'?"day-countries text-dark w-100 countries p-3 px-md-0":"night-countries text-light w-100 countries p-3 px-md-0"}>
                        {this.countriesToRender.map((country)=>{
                            return <CountryCard key={country.numericCode} viewCountryDetails={this.viewCountryDetails} name={country.name} flag={country.flag} region={country.region} population={country.population} capital={country.capital} country={country}/>
                        })}
                    </div>
                </main>
            </div>
        );
    }
}
export default withRouter(CountryList);
