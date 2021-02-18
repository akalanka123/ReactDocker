import React, { useReducer, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { store as nsStore} from "react-notifications-component";
import { getBlogsById, updateBlogs } from "./../../services/blog.service";
import {connect} from 'react-redux'
import * as newsAction from '../../../../redux/actions/newsActions'
import { bindActionCreators } from "redux";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function NewsEdit(props) {
  const notificationSystem = React.createRef();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    title: "",
    content: "",
    id:"",
  });
  const fetchData = React.useCallback(() => {
    getBlogsById(props.id)
      .then((response) => {
        setFormData({
          name: "title",
          value: response.data.title,
        });
        setFormData({
          name: "content",
          value: response.data.content,
        });
        setFormData({
          name: "id",
          value: response.data._id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.actions.editNews(formData);
      nsStore.addNotification({
        title: "News Updated",
        message: "News updated successfully",
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
    if (event) {
      fetchData();
    }
    setModalOpen(event);
  };

  return (
    <>
      <span onClick={() => openModal(!modalOpen)} style={{ cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
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
export default connect(mapStateToProps,mapDispatchToProps)(NewsEdit);
