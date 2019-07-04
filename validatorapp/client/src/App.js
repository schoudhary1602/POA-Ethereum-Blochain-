import React, { Component } from "react";
//import SimpleStorageContract from "../contracts/SimpleStorage.json";
import SwipeableViews from "react-swipeable-views";
import getWeb3 from "./utils/getWeb3";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  Button,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: "#fff"
  },
  slide1: {
    background: "#FEA900"
  },
  slide2: {
    background: "#B3DC4A"
  },
  slide3: {
    background: "#6AC0FF"
  }
};

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  newContractInstance;
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      selectedAccount: "No Account Selected"
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(" web3 ", web3);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      // newContractInstance = createContractInstance(contractAddress, web3);
      this.setState({ web3, selectedAccount: accounts }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  };

  updateInterface() {}

  runExample = async () => {
    // const { accounts, contract } = this.state;
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const pStyle = {
      height: this.state.height,
      width: this.state.width
    };
    const sideBarStyle = {
      height: this.state.height,
      width: "15%"
    };
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div style={pStyle}>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Option 1</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div style={{ flexDirection: "column" }} height={this.state.height}>
          <Row>
            <Col md="2">
              <ListGroup>
                <ListGroupItem>
                  <tr>
                    <tr>Firstname</tr>
                    <tr>Lastname</tr>
                    <tr>Age</tr>
                  </tr>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col>
              <div
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >
                {this.getUI()}
              </div>
            </Col>
            <Col sm="1" />
          </Row>
        </div>
      </div>
    );
  }
  checkIfValidValidator() {
    return false;
  }
  getUI() {
    if (this.checkIfValidValidator()) {
      return this.getInterfaceForValidator();
    } else {
      return this.getIntefaceForRegisterValidator();
    }
  }

  getInterfaceForValidator() {
    return (
      <Row>
        <Row>
          <Col sm="6">
            <Card body>
              <CardTitle>Account Address</CardTitle>
              <CardText>{this.state.selectedAccount}</CardText>
            </Card>
          </Col>
        </Row>
        <Row>
          <SwipeableViews>
            <Card
              body
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <Button>Accept</Button>
              <Button>Reject</Button>
            </Card>
            <Card
              body
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>
                With supporting text below as a natural lead-in to additional
                content.
              </CardText>
              <Button>Accept</Button>
              <Button>Reject</Button>
            </Card>
          </SwipeableViews>
        </Row>
      </Row>
    );
  }

  getIntefaceForRegisterValidator() {
    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input name="name" id="name" placeholder="with a placeholder" />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleAddress">Social Profile</Label>
          <Input
            type="text"
            name="url"
            id="exampleAddress"
            placeholder="http://facebook.com/profile=12345"
          />
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    );
  }

  // Utility method for creating the contract instance
  // createContractInstance(addr) {
  //   var abiDefinitionString = ""; // Compiled ABI defination
  //   var abiDefinition = JSON.parse(abiDefinitionString);
  //   var contract = new web3.eth.Contract(abiDefinition, addr);
  //   return contract;
  // }

  // nominateValidator(validtorAddress, name, publicUrl) {
  //   newContractInstance.methods
  //     .nominateValidator(validtorAddress, name, publicUrl)
  //     .call({
  //       from: accountAddress
  //     })
  //     .then(balanceOfAddress => {
  //       console.log(`Balance of sender address: ${balanceOfAddress}`);
  //     })
  //     .catch(error => {
  //       console.log(`Error with Balance of sender address: ${error}`);
  //     });
  // }
}

export default App;
