import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import ErrorAlert from "../components/ErrorAlert";

const Book = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookData, setBookData] = useState({});

  const getData = async () => {
    const url = `https://api.matgargano.com/api/books/${params["id"]}`;
    setLoading(true);
    setError(false);
    try {
      const request = await fetch(url);
      const response = await request.json();
      setBookData(response);
      console.log(bookData);
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {!error && loading && <p className="text-2xl text-center">Loading...</p>}
      {!error && !loading && (
        <>
          <div className="container">
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
              <img className="book-cover" src={bookData.imageURL} />
              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-violet-200 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-center leading-normal">
                <div className="mb-8">
                  <p className="text-3xl font-bold text-black flex items-center ">
                    Title: {bookData.title}
                  </p>
                  <div className="text-black font-bold text-2xl mb-2">
                    Author: {bookData.author}{" "}
                  </div>
                  <p className="text-black text-xl">
                    Year Written: {bookData.year}
                  </p>
                </div>
                <div className="flex justify-left grid grid-rows-3 text-black">
                  <p>Publisher: {bookData.publisher} </p>
                  <p>Pages: {bookData.pages}</p>
                  <p> Country: {bookData.country}</p>
                </div>

                <div className="flex items-center">
                  <div className="text-sm">
                    <div className="flex justify-around">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Buy Now!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            className="hover:underline text-2xl font-bold justify-around"
            to={`/books`}
          >
            View other Books
          </Link>
        </>
      )}
    </Container>
  );
};

export default Book;
