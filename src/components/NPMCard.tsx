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
            <ListGroup.Item>npm run start</ListGroup.Item>
            <ListGroup.Item>npm run test</ListGroup.Item>
            <ListGroup.Item>npm run specific test</ListGroup.Item>
            <ListGroup.Item>npm i</ListGroup.Item>
            <ListGroup.Item>fetch Gen</ListGroup.Item>
            <ListGroup.Item>npm run tsc</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
