FROM python:3.12
RUN pip install poetry
WORKDIR /python_backend
COPY ./pyproject.toml ./poetry.lock /python_backend/
RUN poetry lock
RUN poetry install
COPY . /python_backend/
EXPOSE 8000
CMD [ "poetry","run","uvicorn","ecomweb.main:app","--host", "0.0.0.0", "--reload" ]