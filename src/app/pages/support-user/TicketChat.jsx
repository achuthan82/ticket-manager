import { useNavigate, useParams } from "react-router";
import TicketChatHeader from "./TicketChatHeader";
import { useDisclosure } from "hooks";

import TicketInfo from "./TicketInfo";
import { Basic } from "./CloseTicketModal";

export default function TicketChat() {

  const navigate = useNavigate();

  const { ticketId } = useParams();

  const [isOpen, { open, close }] = useDisclosure(false);

  const backToTickets = () => {
    navigate("/support-user");
  };


  return (
    <>
      <TicketChatHeader ticketId={ticketId} backToTickets={backToTickets} closeTicket={open} />
      <Basic isOpen={isOpen} onCancel={close}          
        onConfirm={() => {
          close();
          backToTickets();
        }} />
      <TicketInfo />
    </>
  );
}
