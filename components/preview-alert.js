import { Alert } from 'react-bootstrap';

export default () => {
    return (
        <Alert variant="danger">
            Анхаар та урьдчилан үзэх горимд байна. {" "}
            <Alert.Link href="api/preview-exit">
                Энд дарж
            </Alert.Link>Урьдчилан үзэх горимоос гарна уу!
        </Alert>
    )
}