import { Card, Button, Row, Col } from "antd";
import { Link } from 'react-router-dom';

const Home = () => {
  const renderNewItemButton = () => (
    <Link to={'wallet'}>
      <Button type="primary">Wallet</Button>
    </Link>
  );

  return (
    <div>
      <Card title={"Home"} style={{ margin: 20 }} extra={renderNewItemButton()}>
      <img src="https://pbs.twimg.com/media/F59eMKSX0AALsLy?format=jpg&name=medium" alt="Top Image" style={{ width: '100%', marginBottom: 16 }} />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card>
              <img src="https://pbs.twimg.com/media/F59eMKSX0AALsLy?format=jpg&name=medium" alt="Image 1" style={{ width: '100%' }} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <img src="https://ocdn.eu/pulscms-transforms/1/_VYk9kpTURBXy8xM2VkYjJkY2U2Mjc0ODU4NTA4NTQ3ZGZhNTNjYmY5YS5wbmeSlQMAAM0EWM0CcZMFzQJYzQE73gABoTAF" alt="Image 2" style={{ width: '100%' }} />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Home;
