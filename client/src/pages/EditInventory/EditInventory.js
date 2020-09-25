import React from 'react';
import '../EditInventory/EditInventory.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputBox from '../../components/inputbox/InputBox';
import SecondaryBtn from '../../components/secondary-button/SecondaryBtn';
import PrimaryBtn from '../../components/primary-button/primaryBtn';
import GoBackIcon from '../../assets/icons/arrow_back-24px.svg';

class EditInventory extends React.Component {
  constructor() {
    super();
    this.state = {
      warehouseName: '',
      itemName: '',
      description: '',
      category: '',
      status: '',
      quantity: 0,
    };
  }

  componentDidMount() {
    const inventoryId = this.props.match.params.id;
    if (inventoryId) {
      axios
        .get('/api/inventories/products/' + inventoryId)
        .then((response) => {
          this.setState({
            id: response.data.id,
            warehouseName: response.data.warehouseName,
            itemName: response.data.itemName,
            description: response.data.description,
            category: response.data.category,
            status: response.data.status,
            quantity: response.data.quantity,
          });
          this.updateStatus();
        })
        .catch((error) => {
          console.log('your error:', error);
        });
    }
  }

  updateStatus = () => {
    if (this.state.status === 'In Stock') {
      document.getElementById('inStock').checked = true;
    } else {
      document.getElementById('notInStock').checked = true;
    }
  };

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  handleChangeInStock = (e) => {
    if (e.target.checked) {
      this.setState({
        status: 'In Stock',
      });
    } else {
      this.setState({
        status: 'Out of Stock',
      });
    }
  };

  handleChangeOutOfStock = (e) => {
    if (e.target.checked) {
      this.setState({
        status: 'Out of Stock',
      });
    } else {
      this.setState({
        status: 'In Stock',
      });
    }
  };

  submitHandler = (e) => {
    e.preventDefault();

    const updatedInventory = {
      warehouseName: this.state.warehouseName,
      itemName: this.state.itemName,
      description: this.state.description,
      category: this.state.category,
      status: this.state.status,
      quantity: this.state.quantity,
    };
    axios
      .put(
        `/api/inventories/products/${this.props.match.params.id}`,
        updatedInventory
      )
      .then((response) => console.log('your response', response))
      .catch((error) => console.log('your error:', error));
  };

  render() {
    return (
      <div className="centerPage">
        <div className="edit-inventory__container">
          <div className="edit-inventory__nav">
            <Link to="/invetories">
              <img src={GoBackIcon} alt="previous page" className="goBackBtn" />
            </Link>
            <h2 className="edit-inventory__header">Edit Inventory Item</h2>
          </div>
          <form className="edit-inventory__info">
            <div className="edit-inventory__divider">
              <h3 className="edit-inventory__details"> Item Details</h3>
              <InputBox
                label="Item Name"
                placeholder="Item Name"
                onChange={(e) => this.handleChange(e, 'itemName')}
                value={this.state.itemName}
              />
              <label className="input__label"> Description</label>
              <textarea
                type="text"
                className="input__field--desc"
                placeholder="Item Description"
                onChange={(e) => this.handleChange(e, 'description')}
                value={this.state.description}
              ></textarea>
              <label className="input__label"> Category </label>
              <select className="custom-select" id="inventory items">
                <option value="Television">{this.state.category}</option>
                <option value="Gym Bag">Gym Bag</option>
                <option value="Hoodie">Hoodie</option>
                <option value="Keychain">Keychain</option>
                <option value="Shampoo">Shampoo</option>
                <option value="Phone Charger">Phone Charger</option>
                <option value="Tent">Tent</option>
                <option value="Winter Jacket">Winter Jacket</option>
              </select>
            </div>
            <div>
              <h3 className="edit-inventory__details edit-inventory__details--tablet">
                Item Availability
              </h3>
              <label className="input__label"> Status</label>
              <div className="input__selection">
                <div>
                  <input
                    type="radio"
                    name="option"
                    value="In Stock"
                    onChange={this.handleChangeInStock}
                    id="inStock"
                  />
                  <label className="input__btn">In Stock</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="option"
                    value="Out of Stock"
                    onChange={this.handleChangeOutOfStock}
                    id="notInStock"
                  />
                  <label className="input__btn">Out of Stock</label>
                </div>
              </div>

              {this.state.status === 'In Stock' && (
                <InputBox
                  label="Quantity"
                  onChange={(e) => this.handleChange(e, 'quantity')}
                  value={this.state.quantity}
                />
              )}
              <label className="input__label"> Warehouse</label>
              <select className="custom-select" id="warehouses">
                <option value="Manhattan">Manhattan</option>
                <option value="King West">King West</option>
                <option value="Granville">Granville</option>
                <option value="San Fran">San Fran</option>
                <option value="Santa Monica">Santa Monica</option>
                <option value="Seattle">Seattle</option>
                <option value="Montreal">Montreal</option>
                <option value="Boston">Boston</option>
              </select>
            </div>
          </form>
          <div className="edit__btn">
            <SecondaryBtn />
            <PrimaryBtn onClick={this.submitHandler}>Save</PrimaryBtn>
          </div>
        </div>
      </div>
    );
  }
}

export default EditInventory;
