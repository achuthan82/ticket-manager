import { useNavigate, useParams } from "react-router";
import TicketChatHeader from "./TicketChatHeader";

import TicketInfo from "./TicketInfo";

export default function TicketChat() {

    const navigate = useNavigate();

    const { ticketId } = useParams();

    const backToTickets = () => {
    navigate("/support-user"); 
    };

    const closeTicket = () => {
    if (window.confirm("Are you sure you want to close this ticket? This action cannot be undone.")) {
      backToTickets();
    }
  };

    return (
        <>
            <TicketChatHeader ticketId={ticketId} backToTickets={backToTickets} closeTicket={closeTicket} />
            <TicketInfo />
        </>
    );
}
