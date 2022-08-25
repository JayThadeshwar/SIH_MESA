import React from 'react'

function Message(props) {
    // const AvatarSrc = props.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />

    return (
        <>
            {/* <List.Item style={{ padding: '1rem' }}>
                <List.Item.Meta
                    avatar={<Avatar icon={AvatarSrc} />}
                    title={props.who}
                    description={props.text}
                />
            </List.Item>
            {props.isTranslate && <div style={{ marginLeft: '60px' }}>{props?.translation || ''}</div>} */}
        </>
    )
}

export default Message
