import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { appUrls } from "../../services/urls";
import { useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const Overview = () => {
  const [totalFilms, setTotalFilms] = useState(0);
  const [totalStarships, setTotalStarships] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [totalSpecies, setTotalSpecies] = useState(0);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  console.log(characters, "characters")

  const navigate = useNavigate()

  // const getTotalFilms = async () => {
  //   setLoading(true)
  //   try {
  //     const res = await api.get(appUrls?.FILM_URL);
  //     setTotalFilms(res?.data?.count);
  //     setFilms(res?.data?.results || []);

  //     if (res?.data?.results?.characters?.length) {
  //       const characterRequests = res.data.results.characters.map((url) => axios.get(url))
  //       const characterResponses = await Promise.all(characterRequests)
  //       setCharacters(characterResponses.map((p) => p.data.name))
  //     }
  //   } catch (err) {
  //     console.log(err, "scope");
  //   } finally {
  //      setLoading(false)
  //   }
  // };

  const getTotalFilms = async () => {
    setLoading(true);
    try {
      const res = await api.get(appUrls?.FILM_URL);
      setTotalFilms(res?.data?.count);
      setFilms(res?.data?.results || []);

      // Fetch characters for each film
      const filmsWithCharacters = await Promise.all(
        (res?.data?.results || []).map(async (film) => {
          if (film.characters?.length) {
            const characterRequests = film.characters.map((url) => api.get(url));
            const characterResponses = await Promise.all(characterRequests);
            return {
              ...film,
              characterNames: characterResponses.map((c) => c.data.name),
            };
          }
          return { ...film, characterNames: [] };
        })
      );

      setFilms(filmsWithCharacters);
    } catch (err) {
      console.log(err, "scope");
    } finally {
      setLoading(false);
    }
  };



  const getTotalStarships = async () => {
    try {
      const res = await api.get(appUrls?.STARSHIPS_URL);
      setTotalStarships(res?.data?.count);
    } catch (err) {
      console.log(err, "scope");
    }
  };

  const getTotalPeople = async () => {
    try {
      const res = await api.get(appUrls?.PEOPLE_URL);
      setTotalPeople(res?.data?.count);
    } catch (err) {
      console.log(err, "scope");
    }
  };

  const getTotalSpecies = async () => {
    try {
      const res = await api.get(appUrls?.SPECIES_URL);
      setTotalSpecies(res?.data?.count);
    } catch (err) {
      console.log(err, "scope");
    }
  };

  useEffect(() => {
    getTotalFilms();
    getTotalStarships();
    getTotalPeople();
    getTotalSpecies();
  }, []);


  // Pagination Logic
  const totalPages = Math.ceil(films?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFilms = films?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full gap-[75px] mt-[108px] mb-[48px] flex flex-col">
      {/* Stats cards */}
      <div className="flex items-center gap-[55px]">
        <div className="w-[208px] h-[130px] rounded-[10px] bg-white shadow-xl px-[18px] py-[23px] flex flex-col gap-[23px]">
          <div className="flex items-center justify-between">
            <p className="font-inter font-bold leading-6 text-bold text-NEUTRAL-100">Films</p>
            <div className="bg-GREEN-200 w-[27px] h-[26px] rounded-[5px]"></div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-NEUTRAL-100 text-base font-bold leading-6">{totalFilms}</p>
            <p className="text-GREEN-100 font-inter text-[9px] leading-6">
              20 More than than yesterday
            </p>
          </div>
        </div>

        <div className="w-[208px] h-[130px] rounded-[10px] bg-white shadow-xl px-[18px] py-[23px] flex flex-col gap-[23px]">
          <div className="flex items-center justify-between">
            <p className="font-inter font-bold leading-6 text-bold text-NEUTRAL-100">Starship</p>
            <div className="bg-PURPLE-100 w-[27px] h-[26px] rounded-[5px]"></div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-NEUTRAL-100 text-base font-bold leading-6">{totalStarships}</p>
            <p className="text-GREEN-100 font-inter text-[9px] leading-6">
              20 More than than yesterday
            </p>
          </div>
        </div>

        <div className="w-[208px] h-[130px] rounded-[10px] bg-white shadow-xl px-[18px] py-[23px] flex flex-col gap-[23px]">
          <div className="flex items-center justify-between">
            <p className="font-inter font-bold leading-6 text-bold text-NEUTRAL-100">People</p>
            <div className="bg-PINK-100 w-[27px] h-[26px] rounded-[5px]"></div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-NEUTRAL-100 text-base font-bold leading-6">{totalPeople}</p>
            <p className="text-GREEN-100 font-inter text-[9px] leading-6">
              20 More than than yesterday
            </p>
          </div>
        </div>

        <div className="w-[208px] h-[130px] rounded-[10px] bg-white shadow-xl px-[18px] py-[23px] flex flex-col gap-[23px]">
          <div className="flex items-center justify-between">
            <p className="font-inter font-bold leading-6 text-bold text-NEUTRAL-100">Species</p>
            <div className="bg-YELLOW-100 w-[27px] h-[26px] rounded-[5px]"></div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-NEUTRAL-100 text-base font-bold leading-6">{totalSpecies}</p>
            <p className="text-GREEN-100 font-inter text-[9px] leading-6">
              20 More than than yesterday
            </p>
          </div>
        </div>
      </div>

      {/* Films Table */}
      <div className="flex flex-col gap-[31px]">
        <p className="text-NEUTRAL-900 text-base leading-6 font-inter">Films</p>

        <div className="overflow-x-auto overflow-y-auto rounded-[4px]">
          <table className="min-w-full border border-[#A4A7B766]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-6 border-[#0D2FA112] border-b">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Film Title</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Release Date</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Director</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Producer</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Episode ID</th>
                <th className="px-4 py-6 border-[#0D2FA112] border-b text-NEUTRAL-900 font-inter text-base leading-6 font-medium whitespace-nowrap text-left">Characters</th>
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
                currentFilms?.length > 0 ?
                  currentFilms?.map((film, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate("/overview/details", { state: film.url })}>
                      <td className="px-4 py-[20px] border-b border-[#0D2FA112]">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{film.title}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{new Date(film.release_date).toLocaleDateString()}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{film.director}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{film.producer}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">{film.episode_id}</td>
                      <td className="px-4 py-[20px] font-inter text-NEUTRAL-700 text-base leading-6 border-b border-[#0D2FA112]">
                        {/* {film.characters?.[0].slice(0, -3) || "-"} */}
                        {film.characterNames?.length ? film.characterNames.join(", ") : "Not Available"}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="text-center font-inter py-4">
                        No films available
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
  );
};

export default Overview;
