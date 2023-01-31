const APIURL = "http://localhost:8080/math/expamples/";

export const fetchExamples = async (count) => {
    try{
        const res = await fetch(`${APIURL}${count}`);
        const data  = await res.json();

        return data;
    } catch (e) {
        return [];
    }
}