import { useNavigate, useParams } from "react-router";
import TicketChatHeader from "./TicketChatHeader";
import { useDisclosure } from "hooks";

import TicketInfo from "./TicketInfo";
import { Basic } from "./CloseTicketModal";
import { getTicketInfo } from "utils/ticketSinglePageService";
import { useEffect, useState } from "react";

export default function TicketChat() {
  const navigate = useNavigate();
  const [headerDetails, setHeaderDetails] = useState(null);
  const [loading, setLoading] = useState(true);   
  const { ticketId } = useParams();

  const [isOpen, { open, close }] = useDisclosure(false);

  const backToTickets = () => {
    navigate("/support-user");
  };

  useEffect(() => {
    setLoading(true);
    getTicketInfo(ticketId).then((response) => {
      if (response.success) {
        if (response.data.data) {
          setHeaderDetails(response.data.data);
        }
      } else {
        setHeaderDetails(null);
        console.error("Error:", response.error);
      }
      setLoading(false);
    });
  }, [ticketId]);


  return (
    <>
      <TicketChatHeader
        ticketId={ticketId}
        backToTickets={backToTickets}
        closeTicket={open}
        headerDetails={headerDetails}
        loading={loading}
      />
      <Basic
        ticketId={ticketId}
        isOpen={isOpen}
        onCancel={close}
        onConfirm={() => {
          close();
          backToTickets();
        }}
      />
      <TicketInfo details={headerDetails} ticketId={ticketId} />
    </>
  );
}
