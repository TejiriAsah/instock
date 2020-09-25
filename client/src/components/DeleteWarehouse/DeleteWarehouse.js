import React from 'react';
import './DeleteWarehouse.scss';
import SecondaryBtn from '../secondary-button/SecondaryBtn';
import PrimaryBtn from '../primary-button/primaryBtn';
import { Link } from 'react-router-dom';
import closePage from '../../assets/icons/close-24px.svg';
import axios from 'axios';

class DeleteWarehouse extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
    };
  }

  componentDidMount() {
    const warehouseId = this.props.id;
    console.log({ warehouseId });
    if (warehouseId) {
      axios
        .get('/api/warehouses/' + warehouseId)
        .then((response) => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();

    const deletedWarehouse = {
      name: this.state.name,
    };

    axios
      .delete(`/api/warehouses/${this.props.id}`, deletedWarehouse)
      .then((response) => console.log('response', response))
      .catch((error) => console.log('error', error));
  };

  render() {
    return (
      <div>
        <div className="test"> </div>
        <div className="delete-warehouse">
          <Link to="/">
            <img src={closePage} alt="close page" className="close-page" />
          </Link>
          <h2 className="delete-warehouse__heading">
            Delete {this.state.name} warehouse?
          </h2>
          <p className="delete-warehouse__message">
            Please confirm that you'd like to delete the {this.state.name} from
            the list of warehouses. You won't be able to undo this action.
          </p>
          <div className="delete-warehouse__options">
            <Link to="/">
              <SecondaryBtn />
            </Link>
            <PrimaryBtn
              onClick={this.submitHandler}
              classOverride="delete-warehouse__btn"
            >
              Delete
            </PrimaryBtn>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteWarehouse;
