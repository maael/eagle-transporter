import React from 'react'
import Header from './Header'
import Footer from './Footer'

class App extends React.Component {
  render () {
    return (
      <div>
        <div className="ui equal width centered grid">
          <div className="row" style={{ height: '5vh' }}>
            <Header />
          </div>
          <div className="row">
            {this.props.children}
          </div>
          <div className="row" style={{ height: '5vh' }}>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default App
