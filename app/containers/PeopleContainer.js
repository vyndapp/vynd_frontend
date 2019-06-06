// @flow
import React, { Component } from 'react';
import PeopleView from '../components/PeopleView';
import { connect } from 'react-redux';
import * as PersonsActions from '../actions/persons';
import { bindActionCreators } from 'redux';

type Props = {};

class PeopleContainer extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);

    props.initPersonIds([
      { personId: '5cf51a92d7a31906f4abee06', personName: 'Gasser' },
      { personId: '5cf51a92d7a31906f4abee07', personName: 'Hesham' },
      { personId: '5cf51a92d7a31906f4abee08', personName: 'Bahi' },
      { personId: '5cf51a92d7a31906f4abee09', personName: 'Omar' },
      { personId: '5cf51a92d7a31906f4abee10', personName: 'Yahya' },
      { personId: '5cf51a92d7a31906f4abee11', personName: 'Ero' }
    ]);
    props.addPersonId({
      personId: '5cf51a92d7a31906f4abee12',
      personName: 'Dummy'
    });
  }

  render() {
    return (
      <PeopleView
        personIds={this.props.personIds}
        searchAction={this.props.searchPersonName}
        renameAction={this.props.renamePerson}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    personIds: state.persons.personIds
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(PersonsActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleContainer);
