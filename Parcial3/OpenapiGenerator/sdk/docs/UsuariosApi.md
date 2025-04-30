# ApiDeEmpleados.UsuariosApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUsuario**](UsuariosApi.md#createUsuario) | **POST** /usuario | Crear nuevo usuario
[**deleteUsuario**](UsuariosApi.md#deleteUsuario) | **DELETE** /usuario | Eliminar usuario existente
[**getUsuarios**](UsuariosApi.md#getUsuarios) | **GET** /usuario | Obtener todos los usuarios



## createUsuario

> Usuario createUsuario(usuario)

Crear nuevo usuario

Registra un nuevo usuario en el sistema.

### Example

```javascript
import ApiDeEmpleados from 'api_de_empleados';

let apiInstance = new ApiDeEmpleados.UsuariosApi();
let usuario = new ApiDeEmpleados.Usuario(); // Usuario | 
apiInstance.createUsuario(usuario, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **usuario** | [**Usuario**](Usuario.md)|  | 

### Return type

[**Usuario**](Usuario.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteUsuario

> DeleteUsuario200Response deleteUsuario(deleteUsuarioRequest)

Eliminar usuario existente

Elimina permanentemente un usuario del sistema. Requiere el ID del usuario en el cuerpo de la solicitud. 

### Example

```javascript
import ApiDeEmpleados from 'api_de_empleados';

let apiInstance = new ApiDeEmpleados.UsuariosApi();
let deleteUsuarioRequest = new ApiDeEmpleados.DeleteUsuarioRequest(); // DeleteUsuarioRequest | 
apiInstance.deleteUsuario(deleteUsuarioRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deleteUsuarioRequest** | [**DeleteUsuarioRequest**](DeleteUsuarioRequest.md)|  | 

### Return type

[**DeleteUsuario200Response**](DeleteUsuario200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getUsuarios

> [Usuario] getUsuarios()

Obtener todos los usuarios

Retorna una lista paginada de todos los usuarios registrados en el sistema. Puede filtrarse por estado activo/inactivo (parámetro opcional). 

### Example

```javascript
import ApiDeEmpleados from 'api_de_empleados';

let apiInstance = new ApiDeEmpleados.UsuariosApi();
apiInstance.getUsuarios((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[Usuario]**](Usuario.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

