const makeUsersQueryParams = (
  queryParams: any,
  alias: string,
) => {
  let query = '';
  const queryParts: string[] = [];
  const params: { [key: string]: string } = {};
  if (queryParams.id) {
    queryParts.push(`${alias}.id IN (:...ids)`);
    params['ids'] = queryParams.id.split(',');
  }
  if (queryParams.firstName) {
    queryParts.push(`${alias}.firstName = :firstName`);
    params['firstName'] = queryParams.firstName;
  }
  if (queryParams.lastName) {
    queryParts.push(`${alias}.lastName = :lastName`);
    params['lastName'] = queryParams.lastName;
  }
  if (queryParams.email) {
    queryParts.push(`${alias}.email = :email`);
    params['email'] = queryParams.email;
  }
  if (queryParams.phone) {
    queryParts.push(`${alias}.email = :phone`);
    params['phone'] = queryParams.phone;
  }
  if (queryParams.username) {
    queryParts.push(`${alias}.username = :username`);
    params['username'] = queryParams.username;
  }

  if (queryParams.organizationId) {
    if (queryParams.organizationId === null) {
      queryParts.push(`${alias}.organizationId is null`);
    } else {
      queryParts.push(
        `${alias}.organizationId = :organizationId`,
      );
      params['organizationId'] = queryParams.organizationId;
    }
  }

  if ('isOwner' in queryParams) {
    if (typeof queryParams.isOwner !== 'boolean') {
      queryParams.isOwner = queryParams.isOwner === 'true';
    }
    params['isOwner'] = queryParams.isOwner;
    queryParts.push(`${alias}.isOwner = :isOwner`);
  }

  if (queryParams.cnic) {
    queryParts.push(`${alias}.cnic = :cnic`);
    params['cnic'] = queryParams.cnic;
  }

  if (queryParams.searchOnAttributes) {
    const searchingAttributes =
      queryParams.searchOnAttributes.split(',');
    const orQueryParts: string[] = [];
    for (const attribute of searchingAttributes) {
      orQueryParts.push(
        `${alias}.${attribute} like :searchValue`,
      );
    }
    queryParts.push(`(${orQueryParts.join(' OR ')})`);
    params['searchValue'] = `%${queryParams.searchValue}%`;
  }
  query = queryParts.join(' AND ');
  return { query, params };
};

export { makeUsersQueryParams as MakeUsersQueryParams };
