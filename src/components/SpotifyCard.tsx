import { Card, ListGroup } from "react-bootstrap";

interface IProps {
  title: string;
  width: string;
  height: string;
  color?: string;
  border?: string;
}

function BasicCard(props: IProps) {
  const { title, width, height, color, border } = props;
  const borderStyle = "1px solid black";
  return (
    <>
      <Card
        style={{
          width: width,
          height: height,
          backgroundColor: color,
          border: border ?? borderStyle,
        }}
      >
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>Next Song</ListGroup.Item>
            <ListGroup.Item>previous song</ListGroup.Item>
            <ListGroup.Item>add to playlist</ListGroup.Item>
            <ListGroup.Item>show me all details and descriptions</ListGroup.Item>
            <ListGroup.Item>fave</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
