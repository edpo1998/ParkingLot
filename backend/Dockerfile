FROM python:3.8.4

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

COPY . usr/src/app

WORKDIR /usr/src/app

RUN pip install -r requirements/base.txt

EXPOSE 8000
# docker run -it -p 8000:8000 -v $(pwd)"/usr/src/app simpleapp"
# docker start -a idcontainer
CMD python manage.py runserver 0.0.0.0:8000