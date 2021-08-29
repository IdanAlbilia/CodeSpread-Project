import { Route } from "react-router-dom";

// stateless functional components that includes a route -> routes to home screen on click.
const BackButton = () => (
  <Route
    render={({ history }) => (
      // eslint-disable-next-line jsx-a11y/alt-text
      <input
        onClick={() => {
          history.push("/");
        }}
        width="30"
        height="24"
        type="image"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8SExMAAAAODw/8/Py0tLRpamrIyMgLDQ3MzMxjZGRJSUlRUlLMzc1OT09nZ2ednp5+fn7W1tbt7e1fX1/m5uaIiIiZmZmOjo5ERUXe3t5+f3+kpKQ9Pj40NDR0dHT8wWG/AAACRElEQVR4nO3d7U4bMRBG4d3ZNA2BAuGjQKHl/u+yVBRB1v5pa5Tj81zBvPLMjqNklWmSJEmSJEmSJEmSJEmSJHVz+7K/vLu+zy6jn+t49zO7kF62scz/LHGXXUofVzF/iIfsYnrYfgacl+U2u5z29l8Cvh3it+x6mjsOOPMeNtvjgHMcsitqbB1wjsfsktrarwPOcZNdU1OVgE/ZNTVVtOjbyv+RXVRLV5WAqF1RtigsIP4EazOICohvUXxAfIviHzL4FsWfoDN46vAziG9RfEB8i+ID4lvUNXHq8CeIn0F8i+ID4lsUHxDfoviA+BbFL3p8i+JPED+D+BbFB8S3KD4gvkVdE6cOf4L4GcS3KD4gvkXxAfEt6po4dfgTxM8gvkXxAfEt+kgPeP//BUlswOlhfYS0gOUmpAWcLtdv2MHePyufpEt8zy6psWIOd7SIv4pn6S7Osotq65n+mt00XVQishp1c15EpM1iNSJrFje1RoVFXO/9QWZxgFOEReQvjWnQpTHA7QY2i4MuDVjE8hRxe9FZBBj1Asfai17gCLzAEbg0CPzUTzDCJ40BZnGApeEsAjiLBF7gCLzAEbg0EFwaACPMol/bAIw6iwOcIiwi/wI36tc2rEb1AkfgBY6gujRYf/JYadS4yC6qrVpE1n92VRoV995bERH333lFo/ISriPGS3ZB7R01Km1dvPu6+uM5u5ouPhs1fmfX0sshIna7iP0mu5Jubg7nf55eYT/sW+MenyRJkiRJkiRJkiRJkqTe/gJnohmT3JAaLwAAAABJRU5ErkJggg=="
      />
    )}
  />
);

// stateless functional component
const NavbarThread = () => {
  return (
    <nav style={{ textAlign: "center" }} className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <h2>Threads</h2>
        <BackButton></BackButton>
      </div>
    </nav>
  );
};

export default NavbarThread;
