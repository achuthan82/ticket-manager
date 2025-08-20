import { Avatar, Button } from 'components/ui'

const TicketInfo = () => {
    return (
        <>
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Ticket info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Category</p>
                                <p className="font-medium text-gray-900">Leads and Territories</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Priority</p>
                                <p className="font-medium text-orange-500">Medium</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Assigned to</p>
                                <p className="font-medium text-gray-900">Admin Support</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Response time</p>
                                <p className="font-medium text-gray-900">2 hours</p>
                            </div>
                        </div>
                        {/* Messages */}
                        <div className="space-y-6 mt-10">
                            {/* User Message */}
                            <div className="flex items-start space-x-3">
                                <Avatar initialColor="secondary" name="Sarah Walker" />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-medium text-gray-900">You</span>
                                        <span className="text-xs text-gray-500">2 days ago</span>
                                    </div>
                                    <div className="message-bubble message-user p-4 rounded-lg" style={{ backgroundColor: '#f3f4f6', marginLeft: "auto", maxWidth: "70%", wordWrap: "break-word" }}>
                                        <p className="text-gray-700">
                                            {`I purchased the Miami territory but I'm not receiving any leads from that area. The dashboard shows the territory as active, but no leads have come through in the past week.`}
                                        </p>
                                        <p className="text-gray-700 mt-2">
                                            Territory: Miami, FL (33101)
                                        </p>
                                        <p className="text-gray-700">
                                            Purchase date: 2 weeks ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Admin Response */}
                            <div className="flex items-start space-x-3">
                                <Avatar initialColor="success" name="Admin Support" />                                   
                                 <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-medium text-gray-900">Admin Support</span>
                                        <span className="text-xs text-gray-500">2 hours ago</span>
                                    </div>
                                    <div className="message-bubble message-admin p-4 rounded-lg bg-green-50" style={{ backgroundColor: '#c9e0e5', maxWidth: "70%", wordWrap: "break-word" }}>
                                        <p className="text-gray-700">Hi Sarah,</p>
                                        <p className="text-gray-700 mt-2">
                                            {`Thank you for bringing this to our attention. I've checked your account and can confirm that your Miami territory (33101) is properly configured and active.`}                                        </p>
                                        <p className="text-gray-700 mt-2">
                                            {`I've identified that there was a technical issue with lead routing for this specific ZIP code that affected a small number of agents. Our technical team has now resolved this issue.`}
                                        </p>
                                        <p className="text-gray-700 mt-2">
                                            {`You should start receiving leads from this territory within the next 24 hours. As compensation for the inconvenience, we've credited your account with 500 additional mailers for this week.`}
                                        </p>
                                        <p className="text-gray-700 mt-2">
                                            {`Please let me know if you don't see leads coming through by tomorrow, and I'll investigate further.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Reply Box */}
                        <div className="mt-6 border-t pt-6">
                            <h3 className="font-medium text-gray-900 mb-3">Add a reply</h3>
                            <textarea placeholder="Type your message here..." className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-atoll" rows="4"></textarea>
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-3">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a3 3 0 00-3 3v4a2 2 0 002 2h5a2 2 0 002-2V7a3 3 0 00-3-3H8zm3 7V7a1 1 0 00-1-1H8a1 1 0 00-1 1v4a1 1 0 001 1h2a1 1 0 001-1z" ></path>
                                        </svg>
                                    </button>
                                    <span className="text-sm text-gray-500">
                                        Attach files (Max 10MB)
                                    </span>
                                </div>
                                <Button onClick="sendReply()" variant="default"
                                    className="bg-[#2A5A9D] hover:bg-[#1A3A6C] text-white">
                                    
                                    Send Reply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TicketInfo