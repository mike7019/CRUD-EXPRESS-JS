import pytest
from schemathesis import Case, BaseRunner

@pytest.fixture(scope="module")
def schema_url():
    return "http://localhost:4001/swagger.json"

@pytest.fixture(scope="module")
def runner(schema_url):
    return BaseRunner.from_uri(schema_url)

def test_api(runner):
    runner.execute()