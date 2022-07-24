import { Fragment, useEffect } from "react";
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
import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import omBackEnd from "../backend/OmData";
import { ProofModalReadData } from "./ProofModalReadData";

const cards = [
  { name: "More than 1000 Words", href: "#", icon: "", amount: "Proof Date" },
  { name: "Older than 100 days", href: "#", icon: "", amount: "Proof Date" },
  {
    name: "Mora than 10000 Reviews",
    href: "#",
    icon: "",
    amount: "Proof Date",
  },
];

const data1 = {
  title: "Film Title: 'Her'",
  author: "Spike Jonze",
  imageUri:
    "https://resizing.flixster.com/i-GXjMjF3uEhOGrFXptIH0JwWmE=/206x305/v2/https://flxt.tmsimg.com/assets/p9991186_p_v8_ag.jpg%22",
  description:
    "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
  file: {},
};

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};
const timeline = [
  {
    id: 1,
    type: eventTypes.completed,
    content: "File Size",
    target: "25 MB",
    date: "Sep 28",
    datetime: "2020-09-28",
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: "Author",
    target: "Satoshi",
    date: "Sep 22",
    datetime: "2020-09-22",
  },
];

const people = [
  { id: 1, name: "Yes" },
  { id: 2, name: "No" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type ProposalInfoProps = {
  dataId: any;
};

export const DataInfo = ({ dataId }: any) => {
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>(people[0]);
  const [data, setData] = useState<any>(1);
  const [dataURI, setDataURI] = useState<any>();
  const [fileURI, setFileURI] = useState<any>();
  const [encryptedData, setEncryptedData] = useState<any>();

  const handleShowProposalModal = () => setShowProposalModal(true);
  const handleHideProposalModal = () => setShowProposalModal(false);

  useEffect(() => {
    omBackEnd.getDataById(dataId).then((data) => {
      setEncryptedData((data && data.length > 0 && data[0]) || {});
      console.log("Use Effect Data");
      console.log(data);
      saveData();
    });

    async function saveData() {}
  }, [dataId]);

  const id = Number(dataId);
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
                  Data {dataId} - {data ? data1.title : ""}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  Applied by
                  {data ? "Group 1" : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {/* <card.icon className:string="h-6 w-6 text-gray-400" aria-hidden="true" /> */}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.href}
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        Verify Proof
                      </a>
                    </div>
                  </div>
                </div>
              ))}
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
                      {data ? data1.title : ""}
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
                          {data ? "Group 1" : ""}
                        </dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Author
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {data ? data1.author : ""}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Image URI
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <p className="break-words max-w-md">
                            {data ? data1.imageUri : ""}
                          </p>
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

                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Proposal Details
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {data ? data1.description : ""}
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
                    Decrypt
                  </button>
                </div>
                {showProposalModal ? (
                  <ProofModalReadData
                    hideModal={handleHideProposalModal}
                    setData={setData}
                    encryptedData={encryptedData}
                  />
                ) : null}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};
