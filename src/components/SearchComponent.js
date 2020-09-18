import React from 'react';
import {Input,FormGroup,Form} from 'reactstrap';
import '../css/search.css';

function Search(){
    return(
            <Form>
                    <FormGroup className="d-flex justify-content-center align-items-center">
                        <Input type="text" name="search" id="search" placeholder="search for xyz items........"></Input>
                        <button className="logbutton p-2 ml-2"><span className="fa fa-search"></span></button>
                    </FormGroup>
            </Form>
    );
}

export default Search;