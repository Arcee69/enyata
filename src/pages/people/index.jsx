import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import { CgSpinner } from 'react-icons/cg';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false)

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

  const navigate = useNavigate()

  const getTotalPeople = async (page) => {
    setLoading(true)
    try {
      const res = await api.get(`${appUrls?.PEOPLE_URL}/?page=${page}`);
      console.log(res, "maka")
      setPeople(res?.data?.results || []);
      setCount(res?.data?.count || 0);
    } catch (err) {
      console.log(err, "scope");
    } finally {
       setLoading(false)
    }
  };

  useEffect(() => {
    getTotalPeople(currentPage)
  }, [currentPage])


  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full mt-[108px] mb-[46px] flex flex-col">
      {/* People Table */}
      <div className="flex flex-col gap-[31px]">
        <p className="text-NEUTRAL-900 text-base leading-6 font-inter">People</p>

        <div className="overflow-x-auto overflow-y-auto rounded-[4px]">
          <table className="min-w-full border border-[#A4A7B766] ">
            <thead className="bg-gray-50">
              <tr>
                <th className="pr-12 py-6 border-[#0D2FA112] border-b">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Name</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Birth year</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Gender</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Hair Color</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Height</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ?
                <tr className='h-[300px] bg-white border-t border-grey-100'>
                  <td colSpan="8" className="relative">
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <CgSpinner className='animate-spin text-PRIMARY text-[200px]' />
                    </div>
                  </td>
                </tr>
                :
                people?.length > 0 ?
                  people?.map((people, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate("/people/details", { state: people.url })}>
                      <td className="px-4 py-[20px] border-b border-[#0D2FA112]">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{people.name}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{people.birth_year}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b capitalize border-[#0D2FA112]">{people.gender}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b capitalize border-[#0D2FA112]">{people.hair_color}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{`${people.height} CM`}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">
                        {new Date(people.created).toLocaleDateString()}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="text-center text-NEUTRAL-700 font-inter py-4">
                        No people available
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-NEUTRAL-900 text-NEUTRAL-700 cursor-pointer rounded font-inter disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-PRIMARY text-white" : ""
                } font-inter border-NEUTRAL-900 text-NEUTRAL-700`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-NEUTRAL-900 text-NEUTRAL-700 cursor-pointer font-inter rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default People