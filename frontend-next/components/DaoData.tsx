import Link from 'next/link'
// import {data} from './mocks/datas'
import { MultiStepFormReadData} from "./MultiStepFormReadData"  
import {ProofModalReadData} from "./ProofModalReadData"
import {useState} from "react"
  function classNames(...classes : any[]) {
    return classes.filter(Boolean).join(' ')
  }
  // const data = 
  
  export const DaoData= ({data} : any) => {
    
    const [openModal,setOpenModal] = useState<boolean>(false);
    const [dataId,setDataId] = useState<any>(1);

    const dataList = data;
    const dataTypes=["Medical","Movie Scripts","Book Scripts"];


    function toDate(timeStamp:any){
      return new Date(timeStamp*1000).toLocaleString().slice(0,10)
    }
    const handleReadData=(dataIdInput:any) => {
      console.log(dataIdInput);
      setDataId(dataIdInput);
      setOpenModal(true);
    }
    
    return (
      <div className="px-4 sm:px-6 lg:px-8 pt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Dao Data</h1>
            <p className="mt-2 text-sm text-gray-700">
              This is the aggregated data from this Dao.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link href="/data_input">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add Data
              </button>
            </Link>
           
          </div>
        </div>
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Data Type
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Uploded By:
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Number of Properties
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Select</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data:any) => (
                <tr key={data.id}>
                  <td
                    className={classNames(
                      data.id === 0 ? '' : 'border-t border-transparent',
                      'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                    )}
                  >
                    <div className="font-medium text-gray-900">
                      {data.title}
                    </div>
                    <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                      <span>
                        {data.title} / {data.title}
                      </span>
                      <span className="hidden sm:inline"> · </span>
                      <span>{data.title}</span>
                    </div>
                    {data.id !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                  </td>
                  <td
                    className={classNames(
                      data.id === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                    )}
                  >
                    {dataTypes[data.dataType]}
                  </td>
                  <td
                    className={classNames(
                      data.id === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                    )}
                  >
                    Group {data.groupId}
                  </td>
                  <td
                    className={classNames(
                      data.id === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                    )}
                  >
                    {toDate(data.addedDate)}
                  </td>
                  <td
                    className={classNames(
                      data.id === 0 ? '' : 'border-t border-gray-200 text-center',
                      'px-3 py-3.5 text-sm text-gray-500 text-center'
                    )}
                  >
                    <div className="sm:hidden ite">{data.title}</div>
                    <div className="hidden sm:block">{data.dataType}</div>
                  </td>
                  <td
                    className={classNames(
                      data.id === 0 ? '' : 'border-t border-transparent',
                      'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                    )}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={()=> {handleReadData(data.dataId)}}
                    >
                      Download<span className="sr-only">, {data.name}</span>
                    </button>
                    {data.id !== 0 ? <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" /> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
        {openModal ? <ProofModalReadData dataId={dataId}/> : null}
      </div>
    )
  }