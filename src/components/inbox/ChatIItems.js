import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import getPartnerInfo from "../../utils/getPartnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";
import moment from 'moment';
import gravatarUrl from "gravatar-url";

export default function ChatItems() {
    const { auth } = useSelector((state) => state.auth) || {}
    //loggedin user email from redux store
    const { email } = auth || {}

    //get all conversations info 
    const { data: conversations, isLoading, isError, error } = useGetConversationsQuery(email)

    // decide what to render 
    let content = null
    if (isLoading) {
        content = <li>Loading conversations...</li>
    }
    else if (!isLoading && isError) {
        content = <li><Error message={error} /></li>
    }
    else if (!isLoading && !isError && conversations.length === 0) {
        content = <li className='m-t'>No conversations found</li>
    }
    else if (!isLoading && !isError && conversations.length > 0) {
        content = conversations.map(conversation => {
            const { id, message, timestamp } = conversation
            const { name, email: partnerEmail } = getPartnerInfo(conversation.users, email)

            return <li key={id}>
                <ChatItem
                    avatar={gravatarUrl(partnerEmail, { size: 80 })}
                    name={name}
                    lastMessage={message}
                    lastTime={moment(timestamp).fromNow()}
                />
            </li>
        })
    }

    return (
        <ul>{content}</ul>
    );
}
