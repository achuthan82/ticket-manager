import { useParams } from "react-router";

export default function TicketChat() {
  const { ticketId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Chat for Ticket #{ticketId}</h1>
      {/* You can now load ticket details based on ticketId */}
    </div>
  );
}
