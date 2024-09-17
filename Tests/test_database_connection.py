from analytics.database_connection import *

def test_get_team_list():
    teams = get_team_list('ny')
    assert len(teams) == 2