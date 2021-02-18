import axios from "axios";

export async function getBlogs(data) {

  return axios({
        method: "GET",
        url: "http://localhost:1000/notes",
    });
}
export async function getBlogsById(id) {

    return axios({
          method: "GET",
          url: "http://localhost:1000/notes/"+id,
      });
  }
export async function createBlogs(data) {
    return axios({
        method: "POST",
        url: "http://localhost:1000/notes/",
        data: data,
      })
}
export async function updateBlogs(formData) {

    return axios({
        method: "PUT",
        url: "http://localhost:1000/notes/" + formData.id,
        data: formData,
      });
}
