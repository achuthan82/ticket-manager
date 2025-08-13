import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "components/ui";

const faqs = [
  {
    id: "faq-1",
    question: "How do I update my payment method?",
    answer:
      "To update your payment method, go to Account Settings > Billing > Payment Methods. Click 'Update' next to your current card or 'Add New Payment Method' to add a different card.",
  },
  {
    id: "faq-2",
    question: "What is the lead response time guarantee?",
    answer:
      "Our lead response time guarantee ensures that all inquiries are addressed within the agreed SLA timeframe. This helps maintain high customer satisfaction and trust.",
  },
  {
    id: "faq-3",
    question: "Can I change my territory selection?",
    answer:
      "Territory changes are subject to availability. Please contact our support team to request a territory change.",
  },
];

const Multiple = () => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Frequently Asked Questions
      </h2>
      <Accordion
        defaultValue={["faq-1"]}
        multiple
        className="flex flex-col divide-y divide-gray-150 dark:divide-dark-500"
      >
        {faqs.map(({ id, question, answer }, index) => (
          <AccordionItem
            key={id}
            value={id}
            className={clsx(
              "group overflow-hidden",
              index === 0 && "rounded-t-lg",
              index === faqs.length - 1 && "rounded-b-lg"
            )}
          >
            <AccordionButton
              className={clsx(
                "flex w-full cursor-pointer items-center justify-between p-4 text-base font-medium text-gray-700 outline-none ring-primary-500/50 ring-offset-2 ring-offset-white focus-visible:ring dark:text-dark-100 dark:ring-offset-dark-700 transition-colors duration-200",
                "bg-white group-hover:bg-yellow-50"
              )}
            >
              {({ open }) => (
                <>
                  <p>{question}</p>
                  <div
                    className={clsx(
                      "text-sm font-normal leading-none text-gray-400 transition-transform duration-300 dark:text-dark-300",
                      open && "-rotate-180"
                    )}
                  >
                    <ChevronDownIcon className="size-6" />
                  </div>
                </>
              )}
            </AccordionButton>

            <AccordionPanel className="p-4 pt-0 transition-colors duration-200 bg-white group-hover:bg-yellow-50">
              <p>{answer}</p>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export { Multiple };
