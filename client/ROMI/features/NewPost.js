import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { Button, Input } from "react-native-elements";

const NewPost = () => {
  // state variables_____________________________________________________________________
  //author
  const [author, setAuthor] = useState("");
  // content
  const [content, setContent] = useState({});
  // timestamp
  const [timestamp, setTimestamp] = useState("");
  //Comments
  const [comments, setComments] = useState([]);
  //Single Comment
  const [viewerComment, setViewerComment] = useState(" ");
  //likes
  const [likes, setLikes] = useState(0);
  // state methods__________________________________________________________________________
  //set author
  const handleAuthor = () => {
    setAuthor("Robert");
  };
  //set content
  const handleContent = () => {
    setContent({
      text: "An example post",
      image: "https://via.placeholder.com/150",
    });
  };
  //set timestamp
  const handleTimestamp = () => {
    setTimestamp(new Date().toLocaleTimeString());
  };
  //set Comments
  const handleAllComments = (comment) => {
    //the comment is then pushed to the array of comments
    comments.push(comment);
    //the state of the comments is updated to myArrayOfComments
    setComments([...comments]);
    setViewerComment(" ");
    console.log(comments);
  };
  //set viewerComment
  const handleSingleComment = (e) => {
    setViewerComment(e.target.value);
    console.log(viewerComment);
  };
  //set likes
  const handleLikes = () => {
    setLikes(likes + 1);
  };
  // _______________________________________________________________________________________

  return (
    <View>
      <Button title="help" onPress={handleTimestamp} />
      <Text>{timestamp}</Text>

      <View>
        <Input
          onChange={handleSingleComment}
          value={viewerComment}
        />
        <Button title="done" onPress={() => handleAllComments(viewerComment)} />
      </View>
    </View>
  );
};
export default NewPost;
