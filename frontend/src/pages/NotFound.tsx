import PageLayout from "../layout/PageLayout"

const NotFound = () => {
    return (
        <PageLayout>
            <title>404 Not Found - Nexus PC</title>
            <div className="not-found-page">
                <h1>404</h1>
                <p>The page you are looking for does not exist</p>
            </div>
        </PageLayout>
    )
}

export default NotFound