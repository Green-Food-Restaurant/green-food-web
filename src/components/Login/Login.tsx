import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Button, Container, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledPaper = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  padding: '40px',
  textAlign: 'center',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
});

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: CredentialResponse): void => {
    try {
      console.log('Resposta de credenciais completa:', credentialResponse);

      // Verificar se temos a credencial
      if (!credentialResponse.credential) {
        console.error('Credencial não encontrada na resposta');
        return;
      }

      const idToken = credentialResponse.credential;
      console.log('ID Token recebido:', idToken);

      // Armazenar o ID token no localStorage
      localStorage.setItem('idToken', idToken);

      // Decodificar o ID token para obter informações do usuário
      try {
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        console.log('Informações do usuário decodificadas do token:', payload);

        // Armazenar informações do usuário no localStorage
        localStorage.setItem('user', JSON.stringify({
          name: payload.name,
          email: payload.email,
          picture: payload.picture
        }));
      } catch (e) {
        console.error('Erro ao decodificar o ID token:', e);
      }

      // Enviar o ID token para o backend para autenticação
      axios.post('http://173.249.12.112:8081/green-food/api/v1/auth/google/login', {
        idToken: idToken
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Resposta do backend:', response.data);
        navigate('/home');
      })
      .catch(error => {
        console.error('Erro na autenticação com o backend:', error);
        // Mesmo se a autenticação do backend falhar, ainda navegar para a página inicial
        console.log('Navegando para a página inicial apesar do erro no backend');
        navigate('/home');
      });

    } catch (error) {
      console.error('Erro durante o processo de login:', error);
    }
  };

  const handleLoginError = (): void => {
    console.error('Login do Google falhou');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',  
        background: 'url("/healthy-food-background.jpg")',
        backgroundSize: {
          xs: 'cover',    
          sm: 'cover',
          md: 'cover'
        },
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,        
        padding: 0,       
        overflow: 'hidden', 
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Container 
        maxWidth={false}
        sx={{ 
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0
        }}
      >
        <StyledPaper elevation={3}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 1,
              fontWeight: 'bold',
              color: '#2ecc71',
              fontFamily: '"Poppins", sans-serif'
            }}
          >
            Green Food
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              color: '#666',
              fontFamily: '"Poppins", sans-serif'
            }}
          >
            Sua jornada para uma vida mais saudável começa aqui
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 2,
                color: '#888',
                fontSize: '0.9rem'
              }}
            >
              • Receitas Zero Glúten
              <br />
              • Produtos Sem Lactose
              <br />
              • Ingredientes 100% Naturais
              <br />
              • Cardápios Personalizados
            </Typography>
          </Box>

          {/* Botão de login do Google */}
          <Box sx={{ mb: 2 }}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              useOneTap
          //    theme="filled_green"
              text="signin_with"
              shape="pill"
              size="large"
              locale="pt-BR"
              logo_alignment="center"
            />
          </Box>

          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ mt: 2 }}
          >
            Ao entrar, você concorda com nossos Termos de Uso e Política de Privacidade
          </Typography>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Login;