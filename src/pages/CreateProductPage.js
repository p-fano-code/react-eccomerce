import './CreateProductPage.css';
import * as productService from "../product-service";
import * as React from "react";

class CreateProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        price: '',
        description: '',
      },
      error: {},
    };

    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((state) => ({
      form: {...state.form, [name]: value}
    }));
  }

  handleSubmit(event) {
    event.preventDefault()
    let error = null;

    if (this.state.form.name.length < 3) {
      error = {...error, name: 'minLength: 3'}
    }

    if (this.state.form.price > 1000000) {
      console.log(this.state.form)
      error = {...error, price: 'max: 1000000'}
    }

    if (error) {
      this.setState({
        error
      })

      return
    }

    productService.create({...this.state.form, image: this.fileInput.current.files[0]})

    this.setState({
      form: {
        name: '',
        price: '',
        description: '',
      },
      error: {},
    })

    event.target.reset()
    this.fileInput.current.files = null;
  }

  render() {
    return (
      <div className="product-create wrapper">
        <h1>Add new product</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label>
              name
              <input
                onChange={this.handleInputChange}
                value={this.state.form.name}
                name="name" type="text" required/>
            </label>
            {this.state.error.name ? <span>{this.state.error.name}</span> : ''}
          </p>
          <p>
            <label>
              price
              <input
                onChange={this.handleInputChange}
                value={this.state.form.price}
                name="price" type="number"  required/>
            </label>
            {this.state.error.price ? <span>{this.state.error.price}</span> : ''}
          </p>
          <p>
            <label>
              description
              <textarea onChange={this.handleInputChange}
                        value={this.state.form.description}
                        name="description" required maxLength="100"/>
            </label>
          </p>
          <p>
            <label>
              image
              <input type="file" ref={this.fileInput} required/>
            </label>
          </p>
          <p>
            <button className="button" type="submit">Save</button>
          </p>
        </form>
      </div>
    );
  }
}

export default CreateProductPage;
