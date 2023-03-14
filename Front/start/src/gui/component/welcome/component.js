function Welcome(props) {
    console.log('Component_Welcome::render')
    const timeStr = (props.time !== null && props.time !== undefined) ? props.time.toLocaleTimeString() : '';
    return <h1>Привет, {props.id}, {props.name}, {timeStr}</h1>;
}

export default Welcome;