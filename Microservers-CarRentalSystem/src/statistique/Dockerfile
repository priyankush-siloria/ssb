FROM python

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY / /src/
WORKDIR /src
CMD ["python3", "main.py"]