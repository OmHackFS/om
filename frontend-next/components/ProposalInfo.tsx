
import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { proposalsList } from "./mocks/proposals";
import { ProofModalVote } from "./ProofModalVote";
import { useState } from "react";

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
};

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Voting Started",
    target: "By: Sub-Group1",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "No",
    target: "Sub-Group2",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: "Yes",
    target: "Martha Gardner",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: "No",
    target: "Bethany Blake",
    date: "Sep 30",
    datetime: "2020-09-30",
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: "Yes",
    target: "Sub Group 4",
    date: "Oct 4",
    datetime: "2020-10-04",
  },
];
const comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    date: "4d ago",
    imageId: "1494790108377-be9c29b29330",
    body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
  },
  {
    id: 2,
    name: "Michael Foster",
    date: "4d ago",
    imageId: "1519244703995-f4e0f30006d5",
    body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
  },
  {
    id: 3,
    name: "Dries Vincent",
    date: "4d ago",
    imageId: "1506794778202-cad84cf45f1d",
    body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type ProposalInfoProps = {
  proposalId: any;
};

export const ProposalInfo = ({ proposalId }: ProposalInfoProps) => {
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);

  const handleShowProposalModal = () => setShowProposalModal(true);

  const id = Number(proposalId);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src="https://img.freepik.com/free-vector/violet-fire-colours-hand-painted-background_23-2148427580.jpg?w=2000"
                    alt=""
                  />

                  <span
                    className="absolute inset-0 shadow-inner rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Proposal {proposalId} - {proposalsList[1].title}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  Applied by
      
                  {proposalsList[1].group}
                 
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {proposalsList[1].title}
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Personal details and application.
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Proposed By
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {proposalsList[1].group}
                        </dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Funds Requested
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Start Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {proposalsList[1].startDate}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          End Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {proposalsList[1].endDate}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Uploaded Files
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          File Link
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Proposal Links
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{proposalsList[1].link}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Proposal Details
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                        {proposalsList[1].description}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                    >
                      Read full application
                    </a>
                  </div>
                </div>
              </section>

              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium text-gray-900"
                      >
                        Comments
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {comments.map((comment) => (
                          <li key={comment.id}>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {comment.name}
                                  </a>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{comment.body}</p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">
                                    {comment.date}
                                  </span>{" "}
                                  <span className="text-gray-500 font-medium">
                                    &middot;
                                  </span>{" "}
                                  <button
                                    type="button"
                                    className="text-gray-900 font-medium"
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <form action="#">
                          <div>
                            <label htmlFor="comment" className="sr-only">
                              About
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              rows={3}
                              className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Add a note"
                              defaultValue={""}
                            />
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <a
                              href="#"
                              className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                            >
                              <QuestionMarkCircleIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span>Some HTML is okay.</span>
                            </a>
                            <button
                              type="submit"
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Comment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900"
                >
                  Votes
                </h2>

                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                  <ul role="list" className="-mb-8">
                    {timeline.map((item, itemIdx) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {itemIdx !== timeline.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={classNames(
                                  item.type.bgColorClass,
                                  "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                )}
                              >
                                <item.type.icon
                                  className="w-5 h-5 text-white"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {item.content}{" "}
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    {item.target}
                                  </a>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time dateTime={item.datetime}>
                                  {item.date}
                                </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-col justify-stretch">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleShowProposalModal}
                  >
                    Vote
                  </button>
                </div>
                {showProposalModal ? <ProofModalVote /> : null}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};
