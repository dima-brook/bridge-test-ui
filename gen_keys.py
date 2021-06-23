from substrateinterface import Keypair

def get_priv(uri: str):
    print(uri)
    print(Keypair.create_from_uri(f"//{uri}").private_key)


if __name__ == "__main__":

    names = [
        "BOB_STASH",
        "CHARLIE",
        "DAVE",
        "EVE",
        "FERDIE"
    ]

    for name in names:
        get_priv(name)