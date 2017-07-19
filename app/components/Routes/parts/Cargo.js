import React from 'react'
import config from '../../../configure'

const io = require('socket.io-client')
const socket = io(config.localUrl)

class RouteCargo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      blueprint: { data: {} },
      newItem: { name: '', type: 'object' },
      cargo: { test: { String: 'string', Object: { please: 'string' } }, Object2: { please: 'string' }, please: 'boolean' }
    }
    this.typeColours = {
      number: 'blue',
      string: 'green',
      object: 'grey',
      array: 'red',
      boolean: 'purple',
      function: 'pink'
    }
  }

  dataToCargo (data) {
    return Object.keys(data).reduce((cargo, key) => {
      const type = Array.isArray(data[key]) ? 'array' : typeof(data[key])
      if (type === 'object') {
        cargo[key] = this.dataToCargo(data[key])
      } else {
        cargo[key] = type
      }
      return cargo
    }, {})
  }

  componentDidMount () {
    socket.on('server:allocatedBlueprintUrl', () => {
      const url = `${config.url}/blueprint/${socket.id}`
      this.setState({ blueprint: Object.assign({}, this.state.blueprint, { url }) })
    })
    socket.on('server:hitBlueprintUrl', (data) => {
      let cargo = Object.assign({}, data)
      cargo = this.dataToCargo(cargo)
      this.setState({
        blueprint: Object.assign({}, this.state.blueprint, { data }),
        cargo: Object.assign({}, this.state.cargo, cargo)
      })
    })
    $('.cargo-control .ui.dropdown').dropdown({
      onChange: (value, text, $selectedItem) => {
        const input = $selectedItem.parent().parent().parent()
        const label = input.find('.ui.label:not(.dropdown)')
        const dropdown = input.find('.ui.dropdown')
        const button = input.find('.ui.button')
        const elements = [ label, dropdown, button ]
        elements.forEach((el) => {
          Object.keys(this.typeColours).forEach((key) => {
            el.removeClass(this.typeColours[key])
          })
          el.addClass(this.typeColours[value])
        })
        this.setState({ newItem: Object.assign({}, this.state.newItem, { type: value }) })
      }
    })
  }

  onNewItemChange (e) {
    e.preventDefault()
    this.setState({ newItem: Object.assign({}, this.state.newItem, { [e.target.name]: e.target.value }) })
  }

  createNewItem (e) {
    e.preventDefault()
    const newItem = {
      [this.state.newItem.name]: this.state.newItem.type === 'object' ? {} : this.state.newItem.type
    }
    this.setState({ cargo: Object.assign({}, this.state.cargo, newItem), newItem: { name: '', type: this.state.newItem.type } })
  }

  deleteTag (path, e) {
    e.preventDefault()
    const cargo = Object.assign({}, this.state.cargo)
    const layers = path.split('.')
    let objectToDeleteFrom = cargo
    while (layers.length > 1) {
      objectToDeleteFrom = objectToDeleteFrom[layers.shift()]
    }
    delete objectToDeleteFrom[layers[0]]
    this.setState({ cargo })
  }

  objToTags (obj, path, objName, index) {
    function pathify (path, key) {
      if (key) {
        return path ? `${path}.${key}` : key
      } else {
        return path
      }
    }
    const objKeys = Object.keys(obj).map((key, i) => {
      const type = typeof(obj[key]) === 'object' ? 'object' : obj[key]
      if (type === 'object') return this.objToTags(obj[key], pathify(path, key), key, i)
      return (
        <span className={`ui ${this.typeColours[type]} label`} key={i}>
          {key}
          <span className='detail'>{type}</span>
          <i className='delete icon' onClick={this.deleteTag.bind(this, pathify(path, key))}></i>
        </span>)
    })
    if (objName && index !== undefined) {
      if (objKeys.length > 0) {
        return (
          <span className='ui segment' key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
            <span className={`ui top left attached ${this.typeColours['object']} small label`}>
              {objName}
              <span className='detail'>object</span>
              <i className='delete icon' onClick={this.deleteTag.bind(this, pathify(path))}></i>
            </span>
            {[...objKeys]}
          </span>
        )
      } else {
        return (
          <span className={`ui ${this.typeColours['object']} label`} key={index}>
            {objName}
            <span className='detail'>object</span>
            <i className='delete icon' onClick={this.deleteTag.bind(this, pathify(path))}></i>
          </span>)
      }
    } else {
      return objKeys
    }
  }

  requestBlueprintUrl (e) {
    e.preventDefault()
    socket.emit('client:requestBlueprintUrl')
  }

  render () {
    return (
      <div className='ui raised segments'>
        <div className='ui segment' style={{ overflow: 'hidden' }}>
          <h1>Cargo</h1>
        </div>
        <div className='ui cargo-control segment'>
          {this.state.blueprint.url ? (
            <div className='ui labeled button'>
              <a className='ui primary button' href={this.state.blueprint.url}>
                Blueprint Url
              </a>
              <a className='ui basic label' href={this.state.blueprint.url}>
                {this.state.blueprint.url}
              </a>
            </div>
          ) : (
            <button className='ui primary button' onClick={this.requestBlueprintUrl.bind(this)}>Request Blueprint Url</button>
          )}
          <div className='ui divider'></div>
          <form onSubmit={this.createNewItem.bind(this)}>
            <div className='ui action right labeled input'>
              <div className='ui grey label'>
                New Cargo Item
              </div>
              <input type='text' name='name' placeholder='Cargo item name' value={this.state.newItem.name} onChange={this.onNewItemChange.bind(this)} />
              <div className='ui dropdown grey label'>
                <div className='text'>object</div>
                <i className='dropdown icon'></i>
                <div className='menu'>
                  <div className='item'>object</div>
                  <div className='item'>array</div>
                  <div className='item'>number</div>
                  <div className='item'>string</div>
                  <div className='item'>boolean</div>
                  <div className='item'>function</div>
                </div>
              </div>
              <button type='submit' className='ui grey button' onClick={this.createNewItem.bind(this)}>Create</button>
            </div>
          </form>
          <div className='ui segment'>
            <span className='ui top left attached label'>Cargo</span>
            {this.objToTags(this.state.cargo)}
          </div>
        </div>
      </div>
    )
  }
}

export default RouteCargo
