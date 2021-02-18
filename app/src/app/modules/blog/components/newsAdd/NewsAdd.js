import React, { useReducer, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { store as nsStore } from 'react-notifications-component';
import {connect} from 'react-redux'
import * as newsAction from '../../../../redux/actions/newsActions'
import { bindActionCreators } from "redux";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function NewsAdd(props) {
  const notificationSystem = React.createRef();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    title: "",
    content: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.actions.createNews(formData);
    nsStore.addNotification({
      title: "News Added",
      message: "News added successfully",
      type: "success", // 'default', 'success', 'info', 'warning'
      container: "top-right", // where to position the notifications
      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
      dismiss: {
        duration: 3000,
      },
    });
    openModal(!modalOpen);
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  const openModal = (event) => {
    setModalOpen(event);
  };

  return (
    <>
      <span onClick={() => openModal(!modalOpen)} style={{"cursor":"pointer"}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-square"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </span>
      <Modal toggle={() => openModal(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Edit News-{formData && formData.title}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => openModal(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="newsname">News title</label>
              <input
                type="text"
                className="form-control"
                id="newsname"
                aria-describedby="newsNameHelp"
                placeholder="Enter title"
                onChange={handleChange}
                name="title"
                value={formData.title}
              />
              <small id="newsNameHelp" className="form-text text-muted">
                Heading of the news.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="newscontent">News content</label>
              <textarea
                type="text"
                className="form-control"
                id="newscontent"
                aria-describedby="newscontentHelp"
                placeholder="Enter content"
                onChange={handleChange}
                name="content"
                value={formData.content}
              ></textarea>
              <small id="newscontentHelp" className="form-text text-muted">
                Content of the news.
              </small>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={() => openModal(!modalOpen)}
            >
              Close
            </Button>
            <Button color="primary" type="submit">
              Save changes
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
function mapStateToProps(state) {
  return {
    news: state.news
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(newsAction, dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(NewsAdd);
