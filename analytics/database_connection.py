import statsapi as api

def get_team_list(attr = None):
    all_teams = api.lookup_team(attr)
    print(all_teams)
    return all_teams

get_team_list('ny')