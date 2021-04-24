import Card from "react-bootstrap/Card";

const PostTemplate = ({post}) => {
  return (
   
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{post.postTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{fontSize:'13px'}}>
          posted by {post.postAuthor} on {post.datePosted}
        </Card.Subtitle>
        <Card.Text>{post.postContent}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PostTemplate;
