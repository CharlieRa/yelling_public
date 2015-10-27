## Idea

## Tegnologias a utilizar

## Arquitectura

### API
1. /posts
    1. /
        - metodo: **POST**
        - descripción: crear un nuevo post en BD.
        - recursos: localizacion, id usuario.
        - autentificación: No.
        - entrada temporal : Objeto.
            ```
            { 
                "content": "test postman",
                "location": {
                    "longitude" : -70.5807622,
                    "latitude" : -33.5065764
                    }
             }
            ```
        - entrada oficial: Objeto.
            ```
            { 
                "content": "test postman",
                "location": {
                    "longitude" : -70.5807622,
                    "latitude" : -33.5065764
                },
                "author": {
                    "id": "5623195c1d5696d514eab562"
                }
            }
            ```
    1. /nearest
        - metodo: **POST**
        - autenticación : no (**temporal**)
        - entrada: Objeto
            ```
            {longitude: value,latitude: value}
            ```
        - respuesta: Objeto     
2. /users
    1. /me
        - metodo: **GET**
        - autenticación : si
        - entrada: No.
        - respuesta: Arreglo de objetos
            ```
            [
                {
                    "dis": 0,
                    "obj": {
                        "content": "test",
                        "location": [
                            -70.5807622,
                            -33.5065764
                        ],
                        "__v": 0,
                        "_id": "562ebc40544b94d0052063cc",
                        "dateTime": "2015-10-26T23:50:24.662Z",
                        "votes": 0,
                        "author": {
                            "id": "5623195c1d5696d514eab562"
                        }
                    }
                }
            ]
            ```
        

## Contribuidores

Guillermo Labra - Carlos Ramart