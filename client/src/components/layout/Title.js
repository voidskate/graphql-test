const someStyling = () => ({
    title: {
        fontSize: 50,
        padding: "15px",
        marginBottom: "50px"
    }
})

const Title = () => {
    const styles = someStyling();
    return <h1 style={styles.title}>contacts demo</h1>
}

export default Title