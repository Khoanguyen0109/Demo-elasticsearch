export const FILE_TYPE = [
    "doc" , "pdf"
]   

export const END_POINT = {
    get_documents : {
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/documents/`
    },
    delete_document: {
        method: 'DELETE',
        url: (id)=>`${process.env.REACT_APP_API_URL}/documents/${id}`
    },
    upload : {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/documents/upload`
    },
    recreate: {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/index/recreate`
    },
    init_document: {
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/documents/init`,

    },
    get_all: {
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/documents`,
    },
    search: {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/documents/search`,
    }
};


export const END_POINT_ES ={
    get_all: {
        method: 'POST',
        url: `${process.env.REACT_APP_ES_URL}/documents/_search`,
        params: {
            query: {
                match_all :{}
            }
        }
    },
    search_file: {
        method: 'POST',
        url: `${process.env.REACT_APP_ES_URL}/documents/_search`,
        params: (search)=> ({
            query: {
                match : {
                    name: search,
                    
                }
            }
        })
    },


}