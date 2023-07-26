import { Row, Col, Table, Card } from "react-bootstrap";
import Link from "next/link";
const ListArticle = (props) => {
    const dataArticle = props.articles;
    
    return (
        <Row className="mt-6">
            <Col lg={12} md={12} xs={12}>
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mb-2 mb-lg-0">
                            <h3 className="mb-0">List Article</h3>
                        </div>
                        <div>
                            <Link href="/admin/article/add" className="btn btn-primary">Create New Article</Link>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white py-4">
                        <h4 className="mb-0">Draft Article</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataArticle && dataArticle.map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{index+1}</td>
                                        <td>{data.title}</td>
                                        <td>{data.published === 'true' ? 'publish' : 'Unpublish'}</td>
                                        <td>{data.status === false ? data.createdAt : data.updatedAt}</td>
                                        <td>
                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => props.showNotification('wanna delete article', 'delete', data.id)}>Delete</button>
                                            &nbsp;
                                            {data.published === false
                                            ? (
                                                <button type="button" className="btn btn-sm btn-success" onClick={() => props.showNotification('wanna publish article','publish', data.id)}>Publish</button>
                                            ) : (
                                                ''
                                            )}
                                            &nbsp;
                                            <button type="button" className="btn btn-sm btn-default" onClick={() => props.viewArticle(data.id)}>View</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
    )
};

export { ListArticle };
