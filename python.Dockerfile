FROM python:3.8-slim-buster

ENV PROJECT_ROOT /opt/app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

COPY ./recommender-engine .

RUN pip install -r requirements.txt

EXPOSE 8040

CMD ["python", "app.py"]